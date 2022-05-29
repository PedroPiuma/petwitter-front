import { Stack, Text, Image, Box, } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Petweet from '../components/Petweet'
import { useAuth } from '../context/auth-context'
import profileDefault from '../img/profileDefault.png'
import client from '../providers/client'

const Profile = () => {
  let auth = useAuth()
  const { id, name, username } = auth.user
  const profilePicture = auth.user.image_url?.replaceAll("\\", '/')
  const [profile, setProfile] = useState(profileDefault)
  const [twittes, setTwittes] = useState([])
  const pic = process.env.REACT_APP_API_URL + '/' + profilePicture

  useEffect(() => {
    try {
      const request = async () => {
        const response = await client.get(`twitte/${id}`)
        setTwittes(response.data)
        const pictureResponse = await axios.get(pic)
        // console.log(pictureResponse.request.responseURL)
        setProfile(pictureResponse)
      }
      request()
    } catch (error) {
      console.log(error)
    }
  }, [id, pic])

  return (
    <Stack minW={'320px'} maxW={'683px'} spacing={0} width={'100%'}>
      <Stack w={'100%'} p={['34px']} direction='row' align={'center'} gap={['34px']} position='relative'
        borderBottom={'1px solid #EEEEEE'} borderRight={'1px solid #EEEEEE'}>
        <Image borderRadius='full' boxSize={['73px', '120px']} src={profile.request?.responseURL} bgColor='#00ACC1' />
        {/* <a href={profile.request?.responseURL}>net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200</a> */}
        <Box>
          <Text fontWeight={[700]} fontSize={['24px']} lineHeight={['33px']}>{auth.user?.name}</Text>
          <Text color={'#8e8e8e'}>{auth.user?.username}</Text>
        </Box>
        <Text position={'absolute'} px={'8px'} bottom={0} borderBottom={'4px solid #00ACC1'}>Petposts</Text>
      </Stack>

      <Box direction={'column'}>{twittes.map(elem => <Petweet name={name} username={username} body={elem.body} />)}</Box>

    </Stack>
  )
}

export default Profile;
