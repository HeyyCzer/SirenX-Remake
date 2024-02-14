"use client";

import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faAngleDoubleDown, faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./Home.module.css";

import { faHourglass2 } from "@fortawesome/free-regular-svg-icons";
import heroCharacters from "/public/images/home/characters.png";

export default function Home() {
	useEffect(() => {
		const handleScroll = () => {
			const heroBackground = document.querySelector(`.${styles.heroBackground}`);
			if (heroBackground) {	
				const scroll = window.scrollY;
				heroBackground.style.transform = `translateY(${scroll * 0.6}px)`;
				// heroBackground.style.transform = `translateY(${scroll * 0.3}px)`;
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<main className="min-h-screen">
			<section className={ styles.heroContainer }>
				<div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 lg:pl-56 w-full">
					<span className="text-[13px] text-emerald-400 leading-none border border-emerald-400 rounded-full px-4 py-0.5">
						<FontAwesomeIcon icon={ faHourglass2 } className="mr-2" />
						Save your time
					</span>
					<h1 className="text-[72px] font-bold leading-none mb-4 mt-1">
						<span className="text-white [animation-delay:0.70s] animate-siren">Siren</span>
						<span className="text-white animate-siren2">X</span>
					</h1>

					<p className="mx-auto lg:mx-0 text-white/45 text-xl tracking-wide text-center lg:text-left">
						Ease, simplicity and time-saving. <br />
						Your brand new and time-saving <span className="text-gradient-primary font-semibold">carcols.meta</span> editor.<br />
					</p>

					<div className="flex gap-4 mt-8">
						<Link
							href="#features"
							className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-md uppercase text-sm font-semibold tracking-wide transition-all"
						>
							<FontAwesomeIcon icon={ faMagicWandSparkles } className="mr-2" />
							Features
						</Link>
						<Link
							href="/editor"
							className="bg-white hover:bg-gray-200 text-black px-8 py-2 rounded-md uppercase text-sm font-semibold tracking-wide transition-all"
						>
							<FontAwesomeIcon icon={ faEdit } className="mr-2" />
							Open Editor
						</Link>
					</div>
				</div>
				
				<Image
					src={heroCharacters}
					alt="Characters"
					className={`absolute bottom-0 right-0 w-[900px] opacity-80 ${styles.heroCharacters}`}
				/>

				<div className={ styles.heroBackground } style={{ background: `url(/images/home/bg.png)` }} suppressHydrationWarning />


				<div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 mb-8">
					<Link href="#features" className="text-white animate-bounce">
						<FontAwesomeIcon icon={faAngleDoubleDown} size="2x" />
					</Link>
				</div>
			</section>

			<section id="features" className="py-16">
				
			</section>
		</main>
	);
}
