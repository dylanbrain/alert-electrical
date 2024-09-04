// Types
import {Variant} from '@/types/productType'

// Svgs
import Bin from '@/svgs/Bin'
import Increase from '@/svgs/Increase'
import Decrease from '@/svgs/Decrease'

interface CartModalItemProps {
  item: Variant
  removeFromCart: (item: string) => void
  updateQuantity: (id: string, quantity: number) => void // Add this
}

export default function CartModalItem({item, removeFromCart, updateQuantity}: CartModalItemProps) {
  const handleIncreaseQuantity = () => {
    updateQuantity(item?.store?.id as string, (item.quantity || 1) + 1)
  }

  const handleDecreaseQuantity = () => {
    const newQuantity = (item.quantity || 1) - 1
    if (newQuantity > 0) {
      updateQuantity(item?.store?.id as string, newQuantity)
    }
  }

  return (
    <div className="cartItem mb-4 flex  text-primary h-32">
      <img
        src={item?.previewImageUrl}
        alt={item?.store?.title}
        className=" aspect-square object-cover"
      />

      {/* Item details */}
      <div className="ml-4 flex flex-col justify-between ">
        <h3 className="text-lg">{item?.store?.title}</h3>
        <p className="text-lg">
          £{item?.store?.price ? (item?.store?.price * (item?.quantity ?? 1)).toFixed(2) : '0.00'}
        </p>

        <div className="flex items-center border border-secondary border-[0.5px] py-1">
          <button onClick={handleDecreaseQuantity} className="px-2 text-3xl">
            <Decrease height={12} width={12} />
          </button>
          <p className="px-2 text-xl">{item.quantity}</p>
          <button onClick={handleIncreaseQuantity} className="px-2 text-3xl ">
            <Increase height={12} width={12} />
          </button>
        </div>
      </div>

      {/* Remove button */}
      <button className="ml-auto mb-auto" onClick={() => removeFromCart(item?.store?.id as string)}>
        <Bin />
      </button>
    </div>
  )
}
