import { useCallback } from 'react'
import { useSecretCode } from '@/hooks/useSecretCode'
import { useAppStore } from '@/store/useAppStore'
import { toast } from 'sonner'

export function SecretCodeListener() {
  const unlockSecret = useAppStore((s) => s.unlockSecret)
  const hideSecrets = useAppStore((s) => s.hideSecrets)

  const handleUnlock = useCallback((code: string, message: string) => {
    if (code === 'hide-secrets') {
      hideSecrets()
      toast.info(message)
    } else {
      unlockSecret(code)
      toast.success(message)
    }
  }, [unlockSecret, hideSecrets])

  useSecretCode(handleUnlock)

  return null // No UI — just listens
}
