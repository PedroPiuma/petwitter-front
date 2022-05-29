import { Stack, Image, Text, Flex, UnorderedList, ListItem } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import profileDefault from '../img/profileDefault.png'
import client from '../providers/client'

const Petweet = ({ name, username, body, user_id }) => {
    const [user, setUser] = useState([])
    useEffect(() => {
        const request = async () => {
            try {
                const response = await client.get(`/users/${user_id}`)
                setUser(response.data)
            } catch (error) { console.log(error) }
        }
        request()
    }, [user_id])

    return (
        <Stack direction={'row'} p={['20px 16px 16px 16px']} border={'1px solid #EEEEEE'}>
            <Image src={profileDefault} borderRadius='full' boxSize={['48px', '40px']} />
            <Flex direction={'column'} gap={['4px', '9px']}>
                <Stack direction={'row'} align='center' gap={['4px']}>
                    <Link to={'#'}><Text color={['#7d7d7d', 'black']} fontWeight={700} fontSize={['14px', '15px']} lineHeight={['19px', '20px']}>{name ? name : user.name}</Text></Link>
                    <Text color={['#7d7d7d', '#828282']} fontWeight={[300, 400]} fontSize={['12px', '15px']} lineHeight={['17px', '20px']}>{username ? username : user.username}</Text>
                    <UnorderedList ><ListItem ml={'15px'} color={'#757575'} fontWeight={300} fontSize={'12px'} lineHeight={'17px'}>Tempo de publicação</ListItem></UnorderedList>
                </Stack>
                <Text fontWeight={400} lineHeight={'18px'} color={'#141619'}>{body}</Text>
            </Flex>
        </Stack>
    )
}

export default Petweet