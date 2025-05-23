// context/ProfileContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react'

type ProfileData = {
  _id: string
  name: string
  email: string
}

const defaultProfile: ProfileData = {
  _id: '',
  name: '',
  email: '',
}

type ProfileContextType = {
  profile: ProfileData
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile)

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) throw new Error('useProfile must be used within a ProfileProvider')
  return context
}
