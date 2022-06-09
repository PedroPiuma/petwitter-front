import client from '../providers/client'
import { Stack, Text, Box, useToast, CircularProgress, Image, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import Petwitte from '../components/Petwitte'
import Username from '../components/Username'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProfileImage from '../components/ProfileImage'
import pictureOfEnd from '../img/profilePictureWithoutBackground.png'
import profileDefault from '../img/profileDefault.png'

const Profile = () => {
  let auth = useAuth()
  const { id } = auth.user
  const [profile, setProfile] = useState('')
  const [refresh, setRefresh] = useState(1)
  const [profilePicture, setProfilePicture] = useState(profileDefault)
  const [twittes, setTwittes] = useState([])
  const { user_id } = useParams()
  const toast = useToast()
  const [jump, setJump] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const { colorMode } = useColorMode()

  useEffect(() => {
    const request = async (id) => {
      try {
        const response = await client.get(`twitte/${id}?skip=${jump}&take=10`)
        const { data } = await client.get(`users/${id}`)
        jump === 0 ? setTwittes(response.data) : setTwittes(twittes.concat(response.data))
        setProfile(data)
        if (profile?.image_url) setProfilePicture(profile.image_url)
        if (response.data.length < 10) setHasMore(false)
      } catch (error) {
        toast({
          position: 'top',
          title: 'Falha na conexão com servidor.',
          description: error.message,
          status: 'error',
          duration: 10000,
          isClosable: true,
        })
      }
    }
    user_id ? request(user_id) : request(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user_id, profile?.image_url, refresh, jump])

  const fetchData = () => setJump(jump + 10)

  return (
    <Stack minW={'320px'} maxW={'683px'} spacing={0} width={'100%'} borderRight={'1px solid #EEEEEE'}>
      <Stack w={'100%'} p={['34px']} direction='row' align={'center'} gap={['34px']} position='relative'
        borderBottom={'1px solid #EEEEEE'} >
        <ProfileImage profilePicture={profilePicture} />
        <Box>
          <Username name={profile.name} setRefresh={setRefresh} />
          <Text color={'#8e8e8e'}>{profile.username}</Text>
        </Box>
        <Text position={'absolute'} px={'8px'} bottom={0} borderBottom={'4px solid #00ACC1'}>Petposts</Text>
      </Stack>

      <InfiniteScroll dataLength={twittes.length} next={fetchData} hasMore={hasMore}
        loader={<CircularProgress isIndeterminate color='#00ACC1' display={'flex'} justifyContent={'center'} py={'16px'} />}
        endMessage={
          <Stack align={'center'} py='15px'>
            <Text fontWeight={'600'} fontSize='16px' color={colorMode === 'light' ? 'gray.700' : 'white'}>Ruf Ruf! Você já viu tudo!</Text>
            <Image src={pictureOfEnd} boxSize={'80px'} borderRadius='full' bgColor={'#99dee6'} />
          </Stack>}>
        <Box direction={'column'}>
          {
            twittes.map((elem, index) =>
              <Petwitte key={elem.id + Date.now().toString() + index} image={profilePicture} setRefresh={setRefresh} id={elem.id} body={elem.body} createdAt={elem.createdAt} user_id={user_id || id} />)
          }
        </Box>
      </InfiniteScroll>

    </Stack>
  )
}

export default Profile;
