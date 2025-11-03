import { createServerComponentClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

async function getProducts() {
  const supabase = createServerComponentClient({
    cookies
  })

  const { data, error } = await supabase
    .from('products')
    .select('*')

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}
