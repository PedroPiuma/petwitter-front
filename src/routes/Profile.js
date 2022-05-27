import { Stack, Text, Image, Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from '../context/auth-context'
import profileDefault from '../img/profileDefault.png'

const Profile = () => {
  let auth = useAuth()
  const profilePicture = auth.user.image_url?.replaceAll("\\", '/')
  console.log(profilePicture)
  const [profile, setProfile] = useState(profileDefault)

  return (
    <Stack minW={['320px', '683px']}>
      <Stack w={'100%'} p={['34px']} direction='row' align={'center'} gap={['34px']} position='relative' borderBottom={'1px solid #EEEEEE'} borderRight={'1px solid #EEEEEE'}>
        <Image borderRadius='full' boxSize={['63px', '120px']} src={profile} bgColor='#00ACC1' />
        <Box>
          <Text fontWeight={[700]} fontSize={['24px']} lineHeight={['33px']}>{auth.user?.name}</Text>
          <Text color={'#8e8e8e'}>{auth.user?.username}</Text>
        </Box>
        <Text position={'absolute'} px={'8px'} bottom={0} borderBottom={'4px solid #00ACC1'}>Petposts </Text>
      </Stack>

      <Flex>
        <Text>Postagens</Text>
      </Flex>
    </Stack>
  )
}

export default Profile;
