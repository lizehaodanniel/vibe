import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '~/components/ui/button'

// Original upstream license text (preserved verbatim from the upstream
// project `vibe` by thewh1teagle, MIT License). This app is built upon it.
const LICENSE_TEXT = `MIT License

Copyright (c) 2024 thewh1teagle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

interface LicenseDialogProps {
	open: boolean
	onClose: () => void
}

export default function LicenseDialog({ open, onClose }: LicenseDialogProps) {
	useEffect(() => {
		if (!open) return

		const prevBodyOverflow = document.body.style.overflow
		const prevHtmlOverflow = document.documentElement.style.overflow
		document.body.style.overflow = 'hidden'
		document.documentElement.style.overflow = 'hidden'

		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', onKey)

		return () => {
			document.body.style.overflow = prevBodyOverflow
			document.documentElement.style.overflow = prevHtmlOverflow
			window.removeEventListener('keydown', onKey)
		}
	}, [open, onClose])

	if (!open) return null

	return (
		<div className="fixed inset-0 z-[60] overflow-hidden bg-black/45 backdrop-blur-md" onMouseDown={onClose}>
			<div className="flex h-full items-center justify-center overflow-y-auto overscroll-contain p-6" onMouseDown={onClose}>
				<div
					onMouseDown={(event) => event.stopPropagation()}
					className="flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl">
					<div className="flex items-center justify-between border-b border-border/55 px-5 py-4">
						<div>
							<h2 className="text-base font-semibold">Open Source Licenses</h2>
							<p className="text-xs text-muted-foreground">开源协议 · MIT License</p>
						</div>
						<Button onMouseDown={onClose} variant="ghost" size="iconSm" className="h-8 w-8 rounded-lg">
							<X className="h-4 w-4" />
						</Button>
					</div>
					<div className="overflow-y-auto p-5">
						<p className="mb-3 text-sm leading-relaxed text-muted-foreground">
							This application is built upon the open-source project{' '}
							<span className="font-medium text-foreground">vibe</span> by{' '}
							<span className="font-medium text-foreground">thewh1teagle</span>, distributed under the MIT License. The
							original copyright notice and license text are reproduced below.
						</p>
						<pre className="whitespace-pre-wrap rounded-xl border border-border/55 bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground/90">
							{LICENSE_TEXT}
						</pre>
					</div>
				</div>
			</div>
		</div>
	)
}
