import { NETWORK_ICON, NETWORK_LABEL } from "../../constants/networks"
import { useModalOpen, useNetworkModalToggle } from "../../state/application/hooks"

import { ApplicationModal } from "../../state/application/actions"
import { ChainId } from "../../sdk"
import Image from "next/image"
import Modal from "../../components/Modal"
import ModalHeader from "../../components/ModalHeader"
import React from "react"
import cookie from "cookie-cutter"
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React"

export const SUPPORTED_NETWORKS: {
    [chainId in ChainId]?: {
        chainId: string
        chainName: string
        nativeCurrency: {
            name: string
            symbol: string
            decimals: number
        }
        rpcUrls: string[]
        blockExplorerUrls: string[]
    }
} = {
    [ChainId.FANTOM_TESTNET]: {
        chainId: "0xfa2",
        chainName: "Fantom Testnet",
        nativeCurrency: {
            name: "FTM",
            symbol: "FTM",
            decimals: 18,
        },
        rpcUrls: ["https://erpc.apothem.network"],
        blockExplorerUrls: ["https://apothem.blocksscan.io/"],
    },
    [ChainId.MOONRIVER]: {
        chainId: "0x505",
        chainName: "Moonriver",
        nativeCurrency: {
            name: "Moonriver",
            symbol: "MOVR",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.moonriver.moonbeam.network", "https://moonriver.api.onfinality.io/public"],
        blockExplorerUrls: ["https://blockscout.moonriver.moonbeam.network/"],
    },
}

export default function NetworkModal(): JSX.Element | null {
    const { chainId, library, account } = useActiveWeb3React()
    const networkModalOpen = useModalOpen(ApplicationModal.NETWORK)
    const toggleNetworkModal = useNetworkModalToggle()

    if (!chainId) return null

    return (
        <Modal isOpen={networkModalOpen} onDismiss={toggleNetworkModal} maxWidth={672}>
            <ModalHeader onClose={toggleNetworkModal} title="Select a Network" />
            <div className="mb-6 text-lg text-primary">
                You are currently browsing <span className="font-bold text-yellow">SOLAR</span>
                <br /> on the <span className="font-bold text-light-yellow">{NETWORK_LABEL[chainId]}</span> network
            </div>

            <div className="grid grid-flow-row-dense grid-cols-1 gap-5 overflow-y-auto md:grid-cols-2">
                {[ChainId.FANTOM_TESTNET, ChainId.MOONRIVER].map((key: ChainId, i: number) => {
                    if (chainId === key) {
                        return (
                            <button
                                key={i}
                                className="w-full col-span-1 p-px rounded bg-gradient-to-r from-yellow to-yellow"
                            >
                                <div className="flex items-center w-full h-full p-3 space-x-3 rounded bg-dark-1000">
                                    <Image
                                        src={NETWORK_ICON[key]}
                                        alt={`Switch to ${NETWORK_LABEL[key]} Network`}
                                        className="rounded-md"
                                        width="32px"
                                        height="32px"
                                    />
                                    <div className="font-bold text-primary">{NETWORK_LABEL[key]}</div>
                                </div>
                            </button>
                        )
                    }
                    return (
                        <button
                            key={i}
                            onClick={() => {
                                toggleNetworkModal()
                                const params = SUPPORTED_NETWORKS[key]
                                cookie.set("chainId", key)
                                if (key === ChainId.MAINNET) {
                                    console.debug("Network modal switch")
                                    library?.send("wallet_switchEthereumChain", [{ chainId: "0x1" }, account])
                                } else {
                                    console.debug("Network modal")
                                    library?.send("wallet_addEthereumChain", [params, account])
                                }
                            }}
                            className="flex items-center w-full col-span-1 p-3 space-x-3 rounded cursor-pointer bg-dark-800 hover:bg-dark-700"
                        >
                            HEllo we are here!!!
                            <Image
                                src={NETWORK_ICON[key]}
                                alt="Switch Network"
                                className="rounded-md"
                                width="32px"
                                height="32px"
                            />
                            <div className="font-bold text-primary">{NETWORK_LABEL[key]}</div>
                        </button>
                    )
                })}
                {["Matic"].map((network, i) => (
                    <button
                        key={i}
                        className="flex items-center w-full col-span-1 p-3 space-x-3 rounded cursor-pointer bg-dark-800 hover:bg-dark-700"
                    >
                        <Image
                            src="/images/tokens/unknown.png"
                            alt="Switch Network"
                            className="rounded-md"
                            width="32px"
                            height="32px"
                        />
                        <div className="font-bold text-primary">{network} (Coming Soon)</div>
                    </button>
                ))}
            </div>
        </Modal>
    )
}
