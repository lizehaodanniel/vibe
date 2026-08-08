import { ReactNode, useContext, useEffect, useState } from 'react'
import { m } from '~/paraglide/messages.js'
import { UpdaterContext } from '~/providers/updater'
import AppMenu from './app-menu'
import DropModal from './drop-modal'
import SettingsModal from './settings-modal'
import PageTransition from './page-transition'
import ModelDownloadPrompt from './model-download-prompt'
import { ReactComponent as YoutubeIcon } from '~/icons/youtube.svg'
import { openUrl } from '@tauri-apps/plugin-opener'

export default function Layout({ children }: { children: ReactNode }) {
	const [settingsVisible, setSettingsVisible] = useState(false)
	const [settingsScrollTo, setSettingsScrollTo] = useState<string | undefined>(undefined)
	const { updateApp, availableUpdate } = useContext(UpdaterContext)

	function openSettings(scrollTo?: string) {
		setSettingsScrollTo(scrollTo)
		setSettingsVisible(true)
	}

	useEffect(() => {
		function onOpenSettings(event: Event) {
			const scrollTo = (event as CustomEvent<{ scrollTo?: string }>).detail?.scrollTo
			openSettings(scrollTo)
		}
		window.addEventListener('vibe:open-settings', onOpenSettings)
		return () => window.removeEventListener('vibe:open-settings', onOpenSettings)
	}, [])

	return (
		<div className="min-h-screen">
			{settingsVisible && <SettingsModal visible={settingsVisible} setVisible={setSettingsVisible} scrollTo={settingsScrollTo} />}
			<DropModal />
			<ModelDownloadPrompt />
			<div className="app-shell">
			<div className="stagger-in mb-6 flex items-center justify-between gap-4 pb-1">
				<h1 className="app-title">{m.appTitle()}</h1>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => openUrl('https://www.youtube.com/@AIcheatcodeplaybook')}
						className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border/75 bg-card/92 shadow-xs transition-all hover:-translate-y-px hover:bg-card hover:shadow-sm"
						aria-label="YouTube"
						title="YouTube"
					>
						<YoutubeIcon className="h-5 w-5" />
					</button>
					<AppMenu onClickSettings={openSettings} availableUpdate={availableUpdate} updateApp={updateApp} />
				</div>
			</div>
				<PageTransition>
					<div className="stagger-in [animation-delay:120ms]">{children}</div>
				</PageTransition>
			</div>
		</div>
	)
}
