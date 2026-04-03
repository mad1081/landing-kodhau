import { AppShell } from '../components/layout/AppShell'
import { useLang } from '../i18n/LangContext'

export function GroupsPage() {
  const { t } = useLang()
  return (
    <AppShell>
      <div className="px-8 py-8">
        <h1 className="text-2xl font-bold text-[#0d1c2f]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {t('studentGroupsTitle')}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{t('comingSoon')}</p>
      </div>
    </AppShell>
  )
}
