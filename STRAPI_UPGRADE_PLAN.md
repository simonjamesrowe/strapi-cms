# Strapi Upgrade Plan

## Current State
- Strapi v3.1.4 (End of Life - no longer maintained)
- Node.js 24.6.0 (current environment)
- MongoDB database via mongoose connector

## Upgrade Challenges

### Node.js Version Compatibility
Current major Strapi versions have strict Node.js requirements:
- Strapi v3: Requires Node ≤14.x.x
- Strapi v4: Requires Node ≥18.0.0 ≤20.x.x (latest: 4.25.14)
- Strapi v5: Requires Node ≥18.0.0 ≤22.x.x (latest: 5.23.4)

**Current environment (Node 24.6.0) is incompatible with all stable Strapi versions.**

## Recommended Migration Path

### Phase 1: Environment Setup
1. **Install Node Version Manager** (nvm/fnm)
2. **Install Node 20.x** for Strapi v4 compatibility
3. **Test current application** with Node 20

### Phase 2: Strapi v4 Migration (Breaking Changes Expected)
1. **Backup database** completely
2. **Upgrade to Strapi v4.25.14**
3. **Update package structure** (new @strapi/* namespace)
4. **Migrate configuration files**:
   - `config/database.js` → Updated mongoose syntax
   - `config/server.js` → New configuration structure
   - `config/middleware.js` → Updated middleware configuration

### Phase 3: Content Type Migration
1. **Update content type schemas** (new format)
2. **Migrate API routes** (new routing structure)
3. **Update controllers/services** (new API structure)
4. **Test all content type operations**

### Phase 4: Plugin Updates
1. **GraphQL plugin** → `@strapi/plugin-graphql`
2. **Users & Permissions** → `@strapi/plugin-users-permissions`
3. **Upload plugin** → `@strapi/provider-upload-local`

### Phase 5: Admin Panel & Build
1. **Rebuild admin panel** (completely new UI in v4)
2. **Update custom admin modifications** (if any)
3. **Test all admin functionality**

### Phase 6: Production Deployment
1. **Update Docker configuration** (new base images)
2. **Update CI/CD pipeline** (Node version, build process)
3. **Update environment variables** (new naming conventions)
4. **Deploy to staging** for thorough testing
5. **Deploy to production** with rollback plan

## Breaking Changes Summary (v3 → v4)

### Package Structure
```diff
- "strapi": "3.1.4"
+ "@strapi/strapi": "4.25.14"
- "strapi-plugin-graphql": "3.1.4"
+ "@strapi/plugin-graphql": "4.25.14"
```

### Content Types
- Schema format changes
- Relationship definitions updated
- Component structure modified

### API Changes
- New REST API format
- GraphQL schema generation changes
- Middleware system rebuilt

### Configuration
- Database configuration structure
- Server configuration options
- Plugin configuration format

## Risk Assessment
- **High**: Data loss during content type migration
- **Medium**: Custom code compatibility issues
- **Medium**: Admin panel customizations lost
- **Low**: Performance differences

## Timeline Estimate
- **Environment Setup**: 1-2 hours
- **Basic Migration**: 8-16 hours
- **Content Testing**: 4-8 hours
- **Production Deployment**: 2-4 hours
- **Total**: 15-30 hours

## Resources
- [Strapi v3 to v4 Migration Guide](https://docs.strapi.io/dev-docs/migration/v3-to-v4)
- [Strapi v4 Documentation](https://docs.strapi.io/dev-docs/intro)
- [Breaking Changes Reference](https://docs.strapi.io/dev-docs/migration/v3-to-v4/migration-guide-4.0.x-to-4.1.x)