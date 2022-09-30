import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: "",
	price: 0,
	startDate: "",
	endDate: "",
	details: "",
	topicImage: {},
	selectedService: {},
}

const getStore = (initialState) => {
	try {
		const buf = window.localStorage.getItem("selectedService")
		if (buf) {
			const json = JSON.parse(buf)
			for (let k in json) {
				if (initialState[k] !== undefined) {
					initialState[k] = json[k]
				}
			}
		}
	} catch (err) {
		console.log(err)
	}
	return initialState
}

const setStore = (state) => {
	window.localStorage.setItem("selectedService", JSON.stringify(state))
}

export default createSlice({
	name: 'services',
	initialState: getStore(initialState),
	reducers: {
		update: (state, action) => {
			for (const k in action.payload) {
				if (state[k] === undefined) new Error('# undefined key')
				state[k] = action.payload[k]
			}
			setStore(state)
		}
	}
})
