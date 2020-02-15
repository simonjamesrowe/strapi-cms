podTemplate(yaml: """
apiVersion: v1
kind: Pod
metadata:
   namespace: default
spec:
  serviceAccountName: jenkins
  containers:
  - name: docker
    image: docker:latest
    command:
    - cat
    tty: true
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: docker-sock
  - name: kubectl
    image: lachlanevenson/k8s-kubectl:v1.17.0
    command:
    - cat
    tty: true
  volumes:
   - name: docker-sock
     hostPath:
       path: /var/run/docker.sock
"""    
) {
    node (POD_LABEL) {
        container('jnlp') {
            stage('Checkout code') {
                checkout scm
                env.commit = sh returnStdout: true, script: 'git rev-parse --short HEAD'
                env.timestamp = sh (returnStdout: true, script: 'echo `date +"%Y%m%d%H%M"`').trim()
                env.buildVersion = sh (returnStdout: true, script: 'echo $timestamp-$commit').trim()
                sh 'echo Build Version is $buildVersion'
            }
        }

        container ('docker') {
            stage ('build') {
                sh 'docker build -t strapi-cms:latest .'
            }

            stage ('upload') {
                withDockerRegistry([credentialsId: 'simon-rowe-github', url: "https://docker.pkg.github.com/"]) {
                    sh 'docker tag strapi-cms:latest docker.pkg.github.com/simonjamesrowe/strapi-cms/strapi-cms:$buildVersion'
                    sh 'docker push docker.pkg.github.com/simonjamesrowe/strapi-cms/strapi-cms:$buildVersion'
                } 
            }
        }

        container ('kubectl') {
            stage ("deploy") {
                sh 'sed "s/{{version}}/$buildVersion/g" kube.yml > kube-with-version.yml'
                sh 'kubectl apply -f kube-with-version.yml'
            }
        }
    }
}
