//import { use } from "react"
import { Box, Image, Heading, Text, HStack,useToast, IconButton, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/products";
import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Input, ModalFooter, Button } from "@chakra-ui/react";

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600","gray.200");
   // const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, updateProduct} = useProductStore()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const toast = useToast()
    const handleDeleteProduct = async (pid) => {
        const {success,message} = await deleteProduct(pid);
        if(!success) {
            toast({
                title:'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        else{
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
        }
       
        const handleUpdateProduct = async (pid, updatedProduct) => {
           const {success,message}= await updateProduct(pid, updatedProduct);
           onClose();
              if(!success) {
                toast({
                     title: 'Error',
                     description: message,
                     status: 'error',
                     duration: 3000,
                     isClosable: true,
                });
              } else {
                toast({
                     title: 'Success',
                     description: "Product updated successfully",
                     status: 'success',
                     duration: 3000,
                     isClosable: true,
                });
              }
        }
  return (
   <Box
       shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			>
         <Image src={product.image} alt={product.name} w='full' h='48' objectFit='cover' />   
          <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight = 'bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
                </Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon/>} colorScheme='blue'/>
                <IconButton icon={<DeleteIcon/>} onClick={()=>handleDeleteProduct(product._id)} colorScheme='red' /> 
            </HStack>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={()=> handleUpdateProduct(product._id, updatedProduct)}>
                  Update
                </Button>
                <Button variant='ghost' onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
        

          </Modal>
           </Box>

        
  )
}

export default ProductCard