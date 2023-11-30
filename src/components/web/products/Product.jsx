import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify';

function Product() {
    const { productId } = useParams();

    const getProduct = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        console.log(data);
        return data.product;
    }

    const { data, isLoading } = useQuery('product_details', getProduct);
    console.log(data)

    if (isLoading)
        return <h2>Loading...</h2>

    return (
        <div className='container products'>
            <div className="row">
                <div className="col-lg-4">
                    {data.subImages.map((img, index) =>
                        <React.Fragment key={index}>
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'product image',
                                    isFluidWidth: true,
                                    src: img.secure_url
                                },
                                largeImage: {
                                    src: img.secure_url,
                                    width: 1200,
                                    height: 1800
                                },
                                isHintEnabled: true,
                                enlargedImagePosition: 'over'
                            }} />
                        </React.Fragment>
                    )}
                </div>
                <div className="col-lg-8">
                    <h2>{data.name}</h2>
                    <p>{data.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Product