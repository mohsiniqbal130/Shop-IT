import React from 'react';
import Skeleton from 'react-loading-skeleton';

const styles = {
    margin: '25px', 
    width: '90%',
    marginLeft: '5%',
    borderRadius: '15px'
}

const ImageLoading = props => (
    <div>
        <Skeleton style={styles} height={'300px'} />
    </div>
)

export default ImageLoading;