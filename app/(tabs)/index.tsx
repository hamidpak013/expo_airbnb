import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Page = () => {
  return (
    <View>
      <Link href="/(modals)/login">
        <Text>Login</Text>
      </Link>

      <Link href="/(modals)/booking">
        <Text>booking</Text>
      </Link>

      <Link href="/listing/123">
        <Text>Listing details</Text>
      </Link>
    </View>
  )
}

export default Page