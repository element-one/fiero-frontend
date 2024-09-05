import { useQuery } from '@tanstack/react-query'
import { ApiBrandResponse, ApiBrandsResponse } from '@type/api'

import axios from '../axios/client'

export const getBrands = async () => {
  const { data } = await axios.get(`/brands`)
  return data
}

export const useGetBrands = () => {
  return useQuery<ApiBrandsResponse, Error>(['brands'], () => getBrands())
}

export const getBrand = async (brandId: string) => {
  const { data } = await axios.get(`/brands/${brandId}`)
  return data
}

export const useGetBrand = (brandId: string) => {
  return useQuery<ApiBrandResponse, Error>(['brands', brandId], () =>
    getBrand(brandId)
  )
}

export const getBrandBySlug = async (slug: string) => {
  const { data } = await axios.get<ApiBrandResponse>(`/brands/slug/${slug}`)
  return data
}

export const useGetBrandBySlug = (slug: string) => {
  return useQuery<ApiBrandResponse, Error>(
    ['brands', slug],
    () => getBrandBySlug(slug),
    {
      enabled: !!slug,
    }
  )
}
