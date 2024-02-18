const DeltaEnum = {
	FRONT: {
		name: "Front",
		angle: 0,
		delta: 0.00000000,
	},
	RIGHT: {
		name: "Right",
		angle: 90,
		delta: -1.57079633,
	},
	BACK: {
		name: "Back",
		angle: 180,
		delta: 3.14159265,
	},
	LEFT: {
		name: "Left",
		angle: -90,
		delta: 1.57079633,
	},
	FRONT_RIGHT_PASSENGER: {
		name: "Front (Right Passenger)",
		angle: 45,
		delta: -0.78539816,
	},
	BACK_RIGHT_PASSENGER: {
		name: "Back (Right Passenger)",
		angle: 135,
		delta: -2.35619449,
	},
	BACK_LEFT_DRIVER: {
		name: "Back (Left Driver)",
		angle: -135,
		delta: 2.35619449,
	},
	FRONT_LEFT_DRIVER: {
		name: "Front (Left Driver)",
		angle: -45,
		delta: 0.78539816,
	},
}

export default DeltaEnum;