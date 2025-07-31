import React from 'react'
import { packagesData } from '@/data/multiOptionsData'

type Props = {}

const Packages = (props: Props) => {
    return (
        <div>
            <div>
                {
                    packagesData.map(res => (
                        <div key={res.id}>{res.value}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default Packages;