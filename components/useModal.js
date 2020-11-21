import { useState } from 'react'

const useModal = () => {
	const [isShown, setIsShown] = useState(false)

	function toggle() {
		setIsShown(!isShown)
	}

	return {
		isShown,
		toggle,
	}
}

export default useModal
