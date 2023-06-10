interface TenantCreateContext {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userId?: string;
  }
  
  interface TenantContext {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    userId?: string;
    propertyId?: number;
  }
  
  interface TenantUpdateInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }
  
  
  export type {
    TenantContext,
    TenantCreateContext,
    TenantUpdateInput,
  };
  