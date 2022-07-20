/*
 * @Author: Dylight
 * @Date: 2022-07-18 18:06:57
 * @LastEditors: Dylight
 * @LastEditTime: 2022-07-19 18:12:14
 * @FilePath: /web3-namcard/pages/hooks/useEns.tsx
 * @Description: 
 */
import { useProvider, useEnsName, useAccount } from "wagmi";
import { useEffect, useState } from "react";
const useEns = (_addr: string) => {
	const { address } = useAccount()
	const _address = _addr || address
	const [ensData, setEnsData] = useState()
	const provider = useProvider()
	console.log(_address)
	async function getEnsData(_ensName: string) {
		const resolver = await provider.getResolver(_ensName);
		if (!resolver) {
			console.log('ens not found')
			return
		}
		const email = await resolver.getText("email");
		const avatar = await resolver.getText("avatar")
		setEnsData({
			ensName: _ensName,
			email,
			avatar
		})
	}
	const { data, isError, isLoading } = useEnsName({
		address: _address
	})
	useEffect(() => {
		if (_address && data) {
			console.log(data)
			getEnsData(data)
			console.log(ensData)
		}
	})
	return { ensData }
}
export default useEns