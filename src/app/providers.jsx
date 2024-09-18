import {NextUIProvider} from '@nextui-org/react'

export function Providers() {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}