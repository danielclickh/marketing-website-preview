import { useEffect } from 'react'

export interface StripeBuyButtonProps {
  id: `buy_btn_${string}`
  customerEmail?: string
}

export default function StripeBuyButton({
  id,
  customerEmail
}: StripeBuyButtonProps) {
  // Manage external script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/buy-button.js'
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div>
      <stripe-buy-button
        class='flex'
        buy-button-id={id}
        customer-email={customerEmail}
        publishable-key={
          process.env.NEXT_PUBLIC_STRIPE_BUTTON_PUBLISHABLE_KEY
        }></stripe-buy-button>
    </div>
  )
}
