import type { RouteRecordNameGeneric, RouteLocationNormalizedLoaded, RouteLocationResolvedGeneric } from 'vue-router';

export type HomeBreadcrumb = {
  label: string;
  breadcrumb: RouteRecordNameGeneric;
  parent?: string;
  to?: string;
  path?: string;
  name?: string;
};

export type HomeBreadcrumbList = HomeBreadcrumb[];

export function useBreadcrumbs() {
  const router = useRouter();
  const route = useRoute();

  const buildBreadcrumbList = (currentRoute: RouteLocationNormalizedLoaded | RouteLocationResolvedGeneric) => {
    if (!currentRoute) return [];

    const parentBreadcrumbs: HomeBreadcrumbList = currentRoute.meta.parent ? buildBreadcrumbList(router.resolve(currentRoute.meta.parent)) : [];
    const currentBreadcrumb: HomeBreadcrumbList = currentRoute.meta.breadcrumb ? [{ ...currentRoute.meta, path: currentRoute.path, to: currentRoute.path } as HomeBreadcrumb] : [];

    return [...parentBreadcrumbs, ...currentBreadcrumb];
  };

  const breadcrumbs = computed<HomeBreadcrumbList>(() => buildBreadcrumbList(route));

  return {
    breadcrumbs,
  };
}
