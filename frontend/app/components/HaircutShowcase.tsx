"use client";

import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const HaircutShowcase = () => {
    const haircuts = [
        { id: 1, image: '/haircuts/model1.jpg' },
        { id: 2, image: '/haircuts/model2.jpg' },
        { id: 3, image: '/haircuts/model3.jpg' },
        { id: 4, image: '/haircuts/model4.jpg' },
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-black p-10 md:p-20 flex flex-col items-center justify-center">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-extrabold mb-6 text-center tracking-tighter"
            >
                GAYA RAMBUT <br />
                <span className="text-gray-400">TERBAIK</span> DI KOTA INI.
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mb-16"
            >
                Kami fokus pada kenyamanan, presisi, dan detail untuk menciptakan gaya yang membuatmu tampil penuh percaya diri.
            </motion.p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {haircuts.map((haircut) => (
                    <motion.div
                        key={haircut.id}
                        className="rounded-3xl overflow-hidden shadow-lg h-[400px] cursor-pointer"
                        variants={cardVariants}
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={haircut.image}
                            alt={`Gaya rambut ${haircut.id}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default HaircutShowcase;