/**
 * Multi-tenant context (frontend-only scaffold).
 *
 * BACKEND INTEGRATION:
 * - Every domain table should carry a `tenant_id` (uuid) column with NOT NULL + index.
 * - All queries/mutations MUST be scoped by `tenant_id = currentTenant.id`.
 * - In SQL (Postgres/Prisma) enforce isolation via:
 *     a) WHERE tenant_id = $current at the application layer, AND
 *     b) Row-Level Security policies that read the tenant id from JWT claims
 *        (e.g. `auth.jwt() ->> 'tenant_id'`).
 * - A user belongs to one or more tenants via a `memberships` table
 *   (user_id, tenant_id, role). The current tenant is resolved from:
 *     1. URL/subdomain (preferred for SaaS), or
 *     2. a session cookie set after the user picks a tenant.
 * - Replace the mock list below with a server query returning the tenants
 *   the authenticated user has access to.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Tenant = {
  id: string;
  slug: string;
  name: string;
  plan: "free" | "pro" | "business";
};

// MOCK: replace with `GET /api/me/tenants` (server function) once the backend exists.
export const MOCK_TENANTS: Tenant[] = [
  { id: "tnt_1", slug: "studio-bella", name: "Studio Bella", plan: "pro" },
  { id: "tnt_2", slug: "barber-king", name: "Barber King", plan: "free" },
  { id: "tnt_3", slug: "spa-zen", name: "Spa Zen", plan: "business" },
];

type TenantContextValue = {
  tenants: Tenant[];
  currentTenant: Tenant;
  setCurrentTenant: (tenantId: string) => void;
};

const TenantContext = createContext<TenantContextValue | null>(null);

const STORAGE_KEY = "current_tenant_id";

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [currentId, setCurrentId] = useState<string>(MOCK_TENANTS[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && tenants.some((t) => t.id === stored)) {
      setCurrentId(stored);
    }
  }, [tenants]);

  const setCurrentTenant = useCallback((tenantId: string) => {
    setCurrentId(tenantId);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, tenantId);
    }
  }, []);

  const currentTenant = useMemo(
    () => tenants.find((t) => t.id === currentId) ?? tenants[0],
    [tenants, currentId],
  );

  const value = useMemo(
    () => ({ tenants, currentTenant, setCurrentTenant }),
    [tenants, currentTenant, setCurrentTenant],
  );

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useTenant must be used inside <TenantProvider>");
  return ctx;
}
