import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.9.30:2',
  releaseNotes: {
    en_US:
      'Updated start-sdk to 3.0.6. Manage Access credentials remain copyable and are not offered as links to open.',
    es_ES:
      'Se actualizó start-sdk a 3.0.6. Las credenciales de Gestionar acceso se pueden copiar y no se ofrecen como enlaces para abrir.',
    de_DE:
      'start-sdk auf 3.0.6 aktualisiert. Die Zugangsdaten unter „Zugriff verwalten“ bleiben kopierbar und werden nicht als Links zum Öffnen angeboten.',
    pl_PL:
      'Zaktualizowano start-sdk do wersji 3.0.6. Dane logowania w „Zarządzaj dostępem” nadal można kopiować i nie są oferowane jako odnośniki do otwarcia.',
    fr_FR:
      'Mise à jour de start-sdk vers la version 3.0.6. Les identifiants de Gérer l’accès restent copiables et ne sont pas proposés comme liens à ouvrir.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
