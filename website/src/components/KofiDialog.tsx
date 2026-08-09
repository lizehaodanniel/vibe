import { Dialog, DialogContent } from '~/components/ui/dialog'

interface KofiDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export default function KofiDialog({ open, onOpenChange }: KofiDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[92vw] max-w-lg overflow-hidden rounded-2xl border-border bg-card p-0">
				<div className="px-2 py-3">
					<iframe
						id="kofiframe"
						src="https://ko-fi.com/danielsoju/?hidefeed=true&widget=true&embed=true&preview=true"
						style={{ border: 'none', width: '100%', padding: '4px', background: '#f9f9f9' }}
						height={712}
						title="danielsoju"
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
