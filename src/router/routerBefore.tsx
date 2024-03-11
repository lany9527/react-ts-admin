import { Navigate, useLocation, useRoutes } from "react-router-dom";
import routes from "./routes";
import { tokenKey } from "../utils/constants";
// 路有拦截
const RouterBeforeEach = (props: { route: any, children: any }) => {
  const location = useLocation()

  if (props?.route?.meta?.title) {
    document.title = props.route.meta.title
  }
  const isLogin: boolean = !!localStorage.getItem(tokenKey)
  if (props?.route?.meta?.isLogin) {
    if (!isLogin) {
      return <Navigate to={'/login'} replace />
    }
  }
  const routeKey = location.pathname
  if (isLogin && ['/login'].includes(routeKey)) {
    return <Navigate to={'/'} replace />
  }
  return (
    <div>{props.children}</div>
  )
}

// 渲染路由
const renderRoutes = (routes: any) => {
  return routes.map((item: any) => {
    const route: any = {
      meta: item.meta, path: item.path
    }
    if (item.component) {
      route.element = <RouterBeforeEach route={item}><item.component /></RouterBeforeEach>
    }
    if (item.children) {
      route.children = renderRoutes(item.children)
    }
    if (item.redirect) {
      route.element = <Navigate to={item.redirect} />
    }
    return route
  })
}

export default function Router() {
  return useRoutes(renderRoutes(routes))
}