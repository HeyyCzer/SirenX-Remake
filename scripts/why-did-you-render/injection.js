import React from 'react';

import { useAppSelector } from '@/lib/hooks';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import { useSelector } from 'react-redux';
	
// eslint-disable-next-line no-console -- Show information that `whyDidYouRender` has been applied to the website.
console.debug('Applying whyDidYouRender, to help you locate unnecessary re-renders during development. See https://github.com/welldone-software/why-did-you-render');

// See https://github.com/welldone-software/why-did-you-render#options
whyDidYouRender(React, {
	trackAllPureComponents: true,
	trackHooks: true,
	logOwnerReasons: true,
	collapseGroups: true,
	include: [/./],
	trackExtraHooks: [
		[useSelector, "useSelector"],
		[useAppSelector, "useAppSelector"],
	],

	// This is for testing, remove it, if you don't want to log on different values
	logOnDifferentValues: false
});