import { Chip } from '@material-ui/core'
import React from 'react'

const ModalGenre = ({ genre }) => {
    return (
        <Chip
            className="chip"
            label={genre.name}
            color="primary"
            size="small"
        />
    )
}

export default ModalGenre
