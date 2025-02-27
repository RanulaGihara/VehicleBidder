import { defineStore } from 'pinia'
import vehiclesData from '@/assets/data/vehicles.json'  
import type { Vehicle } from '@/types/vehicle';

export const useBidStore = defineStore('bidStore', {
  state: () => ({
    vehicles: [] as Vehicle[],
    filteredBrand: '' as string,
    biddings: [] as { vehicle: Vehicle; bidPrice: number }[]
  }),
  getters: {
    filteredVehicles(state) {
      if (!state.filteredBrand) return state.vehicles
      return state.vehicles.filter(v => v.brand === state.filteredBrand)
    },
    totalBids(state) {
      return state.biddings.reduce((acc, item) => acc + item.bidPrice, 0)
    }
  },
  actions: {
    initializeData() {
      if (this.vehicles.length === 0) {
        this.vehicles = vehiclesData.map(item => ({
          id: item.id,
          brand: item.details.brand,
          model: item.name,
          year: Number(item.details.manufactureYear),
          color: item.details.color,
          price: Number(item.details.price),
          image: item.details.image,
          description: item.details.description,
          currency: item.details.currency
        }))
      }
    },
    setFilteredBrand(brand: string) {
      this.filteredBrand = brand
    },
    addBid(vehicle: Vehicle, bidPrice: number) {
      this.biddings.push({ vehicle, bidPrice })
    }
  }
})
