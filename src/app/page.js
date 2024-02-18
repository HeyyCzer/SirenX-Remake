"use client";

import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faAngleDoubleDown, faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./Home.module.css";

import { AOSInit } from "@/components/AOSInit";
import { faHourglass2 } from "@fortawesome/free-regular-svg-icons";
import heroCharacters from "/public/images/home/characters.png";
import screenshot from "/public/images/home/screenshot.gif";

export default function Home() {
	useEffect(() => {
		const handleScroll = () => {
			const heroBackground = document.querySelector(`.${styles.heroBackground}`);
			if (heroBackground) {	
				const scroll = window.scrollY;
				const scrollMax = 260;

				let target = scroll * 0.6;
				if (target > scrollMax) target = scrollMax;
				heroBackground.style.transform = `translateY(${target}px)`;
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<main className="min-h-screen">
			<AOSInit />

			<section className={ styles.heroContainer }>
				<div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 xl:translate-x-0 xl:left-0 xl:pl-56 w-full z-50 flex flex-col items-center xl:block">
					<span className="text-[13px] text-emerald-400 leading-none border border-emerald-400 rounded-full px-4 py-0.5">
						<FontAwesomeIcon icon={ faHourglass2 } className="mr-2" />
						Save your time
					</span>
					<h1 className="text-[72px] font-bold leading-none mb-4 mt-1">
						<span className="text-white [animation-delay:0.70s] animate-siren">Siren</span>
						<span className="text-white animate-siren2">X</span>
					</h1>

					<p className="text-white/45 text-xl tracking-wide text-center xl:text-left">
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
					className={`absolute bottom-0 right-0 w-[600px] 2xl:w-[900px] opacity-80 ${styles.heroCharacters} hidden xl:block`}
				/>

				<div className={ styles.heroBackground } style={{ background: `url(/images/home/bg.png)` }} suppressHydrationWarning />


				<div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 mb-8">
					<Link href="#features" className="text-white animate-bounce">
						<FontAwesomeIcon icon={faAngleDoubleDown} size="2x" />
					</Link>
				</div>
			</section>

			<section id="about" className="grid grid-cols-1 2xl:grid-cols-2 py-16 px-12 xl:px-20 gap-20">
				<div>
					<h2 data-aos="zoom-in" data-aos-offset="150" className="text-3xl font-bold text-gray-400 text-center mb-12">
						What is <span className="text-white mr-0.5">Siren<span className="text-gradient-primary">X</span></span>?
					</h2>

					<p data-aos="zoom-in" className="text-white/60 text-xl text-center">
						<span className="text-white font-bold">SirenX</span> is a web-based <span className="text-gradient-primary font-bold">carcols.meta</span> editor, designed to make it easier to create and edit vehicle light patterns for <span className="text-gradient-primary font-bold">Grand Theft Auto V</span> and <span className="text-gradient-primary font-bold">FiveM</span> servers. We offer a simple and intuitive interface, so you can create your patterns in a few clicks.
					</p>
				</div>

				<div data-aos="zoom-in" data-aos-offset="150" data-aos-delay="300" className="perspective-1000">
					<Image src={ screenshot } alt="Screenshot" className="max-w-[600px] w-2/3 mx-auto rounded-lg 2xl:transform-style-3d 2xl:-rotate-y-[20deg] backface-hidden p-2 bg-gray-500/20 border border-gray-700/70"/>
				</div>
			</section>

			<section id="features" className="py-16 px-12 xl:px-20">
				<h2 className="text-3xl font-bold text-gray-400 text-center mb-12">
					Why should you choose <span className="text-white mr-0.5">Siren<span className="text-gradient-primary">X</span></span>?
				</h2>

				<div className="grid grid-cols-2 2xl:grid-cols-4 gap-12">
					<div data-aos="fade-up" data-aos-delay="250" className="bg-gray-500/20 border border-gray-700/70 px-8 py-6 text-center h-auto rounded-lg">
						<h1 className="text-[32px]">
							🧠
						</h1>

						<h2 className="font-bold tracking-wider text-white">
							Easy to learn and use
						</h2>

						<p className="text-white/60 mt-4">
							We designed <span className="text-white font-bold">SirenX</span> to be as simple as possible, so you can use it without any hassle. You don&apos;t need to be an expert to use it: just open the editor, import your <kbd><kbd>carcols.meta</kbd></kbd> file, or just start creating a new one.
						</p>
					</div>
					<div data-aos="fade-up" data-aos-delay="500" className="bg-gray-500/20 border border-gray-700/70 px-8 py-6 text-center h-auto rounded-lg">
						<h1 className="text-[32px]">
							⌛
						</h1>

						<h2 className="font-bold tracking-wider text-white">
							Save your time
						</h2>

						<p className="text-white/60 mt-4">
							We know how time-consuming it is to manually create/edit vehicle light patterns. <span className="text-white font-bold">SirenX</span> is here to save your time. You can edit your <kbd><kbd>carcols.meta</kbd></kbd> file in a few clicks, and download it back to your computer. Spend your time on more important things.
						</p>
					</div>
					<div data-aos="fade-up" data-aos-delay="750" className="bg-gray-500/20 border border-gray-700/70 px-8 py-6 text-center h-auto rounded-lg">
						<h1 className="text-[32px]">
							💰
						</h1>

						<h2 className="font-bold tracking-wider text-white">
							Absolutely free
						</h2>

						<p className="text-white/60 mt-4">
							We believe that everyone should have access to the best tools, so we made <span className="text-white font-bold">SirenX</span> absolutely free. You can use it as much as you want. If you like it, you can support us by sharing it with your friends or using the support button (on all pages footer or in the right-corner on the editor page)
						</p>
					</div>
					<div data-aos="fade-up" data-aos-delay="1000" className="bg-gray-500/20 border border-gray-700/70 px-8 py-6 text-center h-auto rounded-lg">
						<h1 className="text-[32px]">
							🔧
						</h1>

						<h2 className="font-bold tracking-wider text-white">
							Advanced features
						</h2>

						<p className="text-white/60 mt-4">
							In addition to colors, we provide other options to customize your patterns, such as: rotation, intensity and even multiples. We are constantly working on new features to make <span className="text-white font-bold">SirenX</span> even better. If you have any suggestions, feel free to contact us.
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
