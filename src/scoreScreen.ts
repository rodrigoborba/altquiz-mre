/*!
 * Copyright (c) Ben Garfield. All rights reserved.
 * Licensed under the MIT License.
 */
import * as MRE from '@microsoft/mixed-reality-extension-sdk';

import AltQuiz from './app';

export default class ScoreScreen {
	public assets: MRE.AssetContainer;
	public actor: MRE.Actor;

	constructor(private app: AltQuiz) {
		this.assets = new MRE.AssetContainer(this.app.context);

		let highScore = 1;
		for (const p of app.playerList) {
			// p.icon.appearance.enabled = false;
			// p.icon.findChildrenByName('iconLabel', false)[0].text.enabled = false;
			if (p.score > highScore) {
				highScore = p.score;
			}
		}

		const mesh = this.assets.createBoxMesh('scoreBar', 1, 0.04, 0.001);
		this.actor = MRE.Actor.Create(app.context, {
			actor: {
				name: 'scoreContainer',
				parentId: app.scene.id,
				transform: { local: { position: { x: -1.8, y: 1.32, z: -0.001 } } }
			}
		});
		const containerWidth = 3.6;
		const containerHeight = 1.62;

		for (let i = 0; i < app.playerList.length; i++) {
			const p = app.playerList[i];
			const scoreVal = p.score > 0 ? p.score : 1;
			const label = MRE.Actor.CreateEmpty(app.context, {
				actor: {
					parentId: this.actor.id,
					name: 'scoreText',
					transform: { local: { position: {
						x: (i % 2) * containerWidth / 2,
						y: containerHeight - Math.floor(i / 2) * (containerHeight / 10)
					} } },
					text: {
						contents: p.name,
						height: 0.075,
						anchor: MRE.TextAnchorLocation.TopLeft,
						// color: p.color
					}
				}
			});

			const bar = MRE.Actor.Create(app.context, {
				actor: {
					parentId: label.id,
					name: 'scoreBar',
					transform: { local: {
						position: { y: -0.13 },
						scale: { x: 0 }
					}},
					appearance: {
						meshId: mesh.id,
						materialId: this.assets.createMaterial('scoreBar', {
							color: {
								r: Math.min(1, 2 - 2 * (scoreVal / highScore)),
								g: Math.min(1, 0 + 2 * (scoreVal / highScore)),
								b: 0
							}
						}).id
					}
				}
			});
			const maxBarLength = containerWidth / 2 - 0.2;
			bar.animateTo({transform: {local: {
				position: {x: bar.transform.local.position.x + (maxBarLength * (scoreVal / highScore)) / 2 },
				scale: {x: maxBarLength * (scoreVal / highScore)}
			}}}, 3 * (scoreVal / highScore), MRE.AnimationEaseCurves.Linear);

			setTimeout(() => {
				label.text.contents += `    ${p.score}`;
				this.app.playSound(scoreVal === highScore ? 'correct' : 'buzz', (scoreVal / highScore) - 1);
			}, 3000 * (scoreVal / highScore));
		}
		this.app.playSound('rise');
	}

	public destroy() {
		this.actor.destroy();
		this.assets.unload();
	}
}
