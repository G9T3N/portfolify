import { type ReactElement } from 'react'

import { type PermissionType } from '../hooks/usecheckPermissions'

type PermissionsWrapperProps = {
    readonly children: ReactElement
    readonly className?: string
    readonly perm: PermissionType
}

export function PermissionsWrapper({
    children,
    className,
    perm,
}: PermissionsWrapperProps) {
    switch (perm.status) {
        case 'disabled':
            return (
                <Tooltip>
                    <Tooltip.Trigger asChild>
                        {/*
              - inline-block & relative so tooltip can position itself
              - cursor-not-allowed for the 🚫 cursor
            */}
                        <span className={`${className} h-full cursor-not-allowed relative`}>
                            {/*
                - opacity-50 dims the child
                - pointer-events-none makes it truly inert
              */}
                            <span className="opacity-50 cursor-not-allowed pointer-events-none">
                                {children}
                            </span>
                        </span>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                        className="z50!"
                        side="top"
                    >
                        {perm.reason}
                    </Tooltip.Content>
                </Tooltip>
            )

        case 'enabled':
            return children

        case 'hidden':
            return null
    }
}

import { permissionsQueryOptions } from '../querise'

export type PermissionType =
    | { reason: string; status: 'disabled' }
    | { status: 'enabled' }
    | { status: 'hidden' }

export function useCheckPermissions(
    targetPage: string,
    targetPermission: string
): PermissionType {
    const { data, error, isLoading } = useQuery(permissionsQueryOptions())

    const clientName = 'ydis-dashboard' // or pull this from context/env
    if (isLoading || error) {
        return { status: 'hidden' }
    }

    const permObj =
        data?.data?.data?.clients?.[clientName]?.pages?.[targetPage]?.permissions?.[
        targetPermission
        ]

    const hasPermission = permObj?.value === true
    const disabledReason = permObj?.disabledReason ?? ''

    if (!hasPermission) {
        return disabledReason
            ? { reason: disabledReason, status: 'disabled' }
            : { status: 'hidden' }
    }

    return { status: 'enabled' }
}

