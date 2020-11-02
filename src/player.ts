/*!
 * Copyright (c) Ben Garfield. All rights reserved.
 * Licensed under the MIT License.
 */
import * as MRE from '@microsoft/mixed-reality-extension-sdk';

export interface PlayerLike {
	id: MRE.Guid;
	name: string;
	score: number;
	answered: boolean;
	answer: number;
	timeToAnswer: number;
	screen: MRE.Actor;
}

export class Player implements PlayerLike {
	public id: MRE.Guid;
	public name: string;
	public score = 0;
	public answered = false;
	public answer: number = null;
	public timeToAnswer = 0;
	public screen: MRE.Actor;
	public color: MRE.Color3;

	public constructor(id: MRE.Guid, name: string) {
		this.id = id;
		this.name = name;
	}
}
