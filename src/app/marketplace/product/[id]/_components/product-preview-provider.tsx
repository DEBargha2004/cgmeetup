'use client'

import { createContext, useContext, useState } from 'react'

type ProductPreviewContextType = {
  images: string[]
  currentImageIndex: number
  setCurrentIndex: (index: number) => void
}

const ProductPreviewContext = createContext<ProductPreviewContextType | null>(
  null
)

export const useProductPreview = () => {
  return useContext(ProductPreviewContext)
}

export const ProductPreviewProvider = ({
  children,
  images
}: {
  children: React.ReactNode
  images: string[]
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const setCurrentIndex = (index: number) => {
    setCurrentImageIndex(index)
  }
  return (
    <ProductPreviewContext.Provider
      value={{ images, currentImageIndex, setCurrentIndex }}
    >
      {children}
    </ProductPreviewContext.Provider>
  )
}
