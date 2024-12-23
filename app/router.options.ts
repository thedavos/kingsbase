import type { RouterConfig } from '@nuxt/schema';
import type { RouteLocationNormalized } from 'vue-router';
import { appPageTransition as defaultPageTransition } from '#build/nuxt.config.mjs';

function findHashPosition(hash: string): { el: any; behavior: ScrollBehavior; top: number } | undefined {
  const el = document.querySelector(hash);
  // vue-router does not incorporate scroll-margin-top on its own.
  if (el) {
    const top = Number.parseFloat(getComputedStyle(el).scrollMarginTop);

    return {
      el: hash,
      behavior: 'smooth',
      top,
    };
  }
}

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();

    if (history.state && history.state.stop) {
      return;
    }
    if (history.state && history.state.smooth) {
      return {
        el: history.state.smooth,
        behavior: 'smooth',
      };
    }

    // If history back
    if (savedPosition) {
      // Wait for `page:transition:finish` or `page:finish` depending on if transitions are enabled or not
      const hasTransition = (route: RouteLocationNormalized) => !!(route.meta.pageTransition ?? defaultPageTransition);
      const hookToWait = (hasTransition(from) && hasTransition(to)) ? 'page:transition:finish' : 'page:finish';
      // Handle Suspense resolution
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce(hookToWait, () => {
          setTimeout(() => resolve(savedPosition), 50);
        });
      });
    }

    // Scroll to heading on click
    if (to.hash) {
      return new Promise((resolve) => {
        if (to.path === from.path) {
          setTimeout(() => resolve(findHashPosition(to.hash)), 50);
        }
        else {
          nuxtApp.hooks.hookOnce('page:finish', () => {
            setTimeout(() => resolve(findHashPosition(to.hash)), 50);
          });
        }
      });
    }

    // Scroll to top of window after page loaded
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:finish', () => {
        setTimeout(() => resolve({ top: 0 }), 50);
      });
    });
  },

  routes: (readonlyRoutes) => {
    console.log('readonlyRoutes: ', readonlyRoutes);
    return [
      ...readonlyRoutes,
      {
        name: 'admin-dashboard',
        path: '/admin',
        component: () => import('@/admin/pages/index.vue'),
        meta: {
          layout: 'admin-layout',
        },
      },
      {
        name: 'admin-leagues',
        path: '/admin/leagues',
        component: () => import('@/admin/pages/leagues/index.vue'),
        meta: {
          layout: 'admin-layout',
        },
      },
      {
        name: 'leagues-new',
        path: '/admin/leagues/new',
        component: () => import('@/admin/pages/leagues/new.vue'),
        meta: {
          layout: 'admin-layout',
        },
      },
    ];
  },

  // routes: [
  //   {
  //     name: 'admin',
  //     path: '/admin'
  //     component: () => import('./admin/pages/index.vue'),
  //   },
  // ],
};
