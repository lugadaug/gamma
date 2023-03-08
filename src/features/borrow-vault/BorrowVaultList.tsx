import Dots from "../../components/Dots"
import React from "react"

import BorrowVaultListItem from "./BorrowVaultListItem"

const BorrowVaultList = ({ markets }) => {
    return markets && markets.length > 0 ? (
        <>
            <div className="grid grid-cols-5 text-base font-bold text-primary">
                <div className="flex items-center col-span-2 px-4 lg:col-span-1">{`Asset`}</div>
                <div className="flex items-center px-2">{`Available`}</div>
                <div className="flex items-center px-2">{`Liquidity`}</div>
                <div className="flex items-center px-2">{`Your Borrows`}</div>
                <div className="flex items-center justify-end flex px-4">{`Loan APY`}</div>
            </div>
            <div className="flex-col mt-2">
                {markets.map((market, index) => (
                    <BorrowVaultListItem key={index} market={market} />
                ))}
            </div>
        </>
    ) : (
        <div className="w-full py-6 text-center">
            <Dots>{`Loading`}</Dots>
        </div>
    )
}

export default BorrowVaultList
