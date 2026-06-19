import type { NavigateFunction } from 'react-router'
import { useNavigate } from 'react-router' // Added missing import
import * as ApiErrors from './ApiErrorHandler'

type BodyProps = {
    children: React.ReactElement
    Skeleton?: React.ReactElement
    isPage: boolean
    route?: string
    hasData: boolean
    status: number | string | undefined
    loading: boolean
    error?: {
        title?: string
        message?: string
        action?: () => void
        actionText?: string
    }
}

// 1. Declarative Error Map Strategy
const errorMap: Record<
    string,
    (navigate: NavigateFunction, route: string | undefined, isPage: boolean, error?: BodyProps['error']) => React.ReactElement | null
> = {
    '400': (navigate, route) => ApiErrors.BadRequest(navigate, route),
    '404': (navigate, route, isPage) => ApiErrors.NotFound(navigate, route, isPage),
    '403': (navigate, route, isPage) => ApiErrors.NotAllowed(navigate, route, isPage),
    '401': () => ApiErrors.UnAuthorized(),
}

export const Body = ({
    status,
    children,
    isPage,
    route,
    hasData,
    loading,
    Skeleton,
    error,
}: BodyProps): React.ReactElement => {
    const navigate = useNavigate()

    // 2. Fallback to Skeleton immediately if loading
    if (loading) {
        return <>{Skeleton}</>
    }

    // 3. Resolve Error Dialog dynamically (No ifs, no switches)
    let errorDialog: React.ReactElement | null = null
    if (status) {
        const stringStatus = status.toString()

        if (errorMap[stringStatus]) {
            errorDialog = errorMap[stringStatus](navigate, route, isPage, error)
        } else if (Number(status) >= 500) {
            errorDialog = ApiErrors.ServerErrors(navigate, route, isPage, error)
        }
    }

    // 4. Handle success/empty states cleanly
    if (errorDialog) {
        return errorDialog
    }

    return hasData
        ? children
        : ApiErrors.SuccessEmpty(hasData, children, isPage, navigate, route)
}