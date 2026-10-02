export interface Equipment {
  badge: string;
  title: string;
  img: string;
  desc: string;
  features: string[];
}

export const EQUIPMENT: Equipment[] = [
  {
    badge: 'AUDIO RENTAL',
    title: 'Line Array Sound Systems',
    img: '/PHOTO-2026-05-17-11-37-20.jpg',
    desc: 'Touring-grade concert audio. Flown or ground-stacked line arrays with matching subwoofers and digital amplification, tuned on-site by our own engineers.',
    features: ['Flown & Ground-Stacked Arrays', 'Digital Amplification & Processing', 'On-Site Engineer Included'],
  },
  {
    badge: 'MIXING CONSOLE',
    title: 'Digital Mixing Consoles',
    img: '/PHOTO-2026-08-08-19-58-40.jpg',
    desc: 'Networked digital audio consoles with remote stage boxes, multi-track recording capability, and premium DSP processing for live sound and broadcast.',
    features: ['64+ Channel Capacity', 'Networked Digital Audio', 'Remote Stage Boxes'],
  },
  {
    badge: 'LED DISPLAY',
    title: 'High-Definition LED Video Walls',
    img: '/PHOTO-2026-01-17-20-01-59.jpg',
    desc: 'Fine pixel-pitch indoor LED video panels with flicker-free refresh rates for camera, plus UHD processors for seamless multi-source switching.',
    features: ['Fine Pixel Pitch Panels', 'Flicker-Free High Refresh', 'UHD Media Processing'],
  },
  {
    badge: 'STAGE LIGHTS',
    title: 'Intelligent Moving Heads & Beams',
    img: '/PHOTO-2026-05-07-21-46-43.jpg',
    desc: 'Beam fixtures, hybrid moving heads, and high-power LED pixel washes for concert stages, award shows, and large-format celebrations.',
    features: ['Sharpy & Beam Fixtures', 'Hybrid Moving Heads', 'LED RGBW Washes'],
  },
  {
    badge: 'RIGGING',
    title: 'Aluminium Box Truss & Rigging',
    img: '/PHOTO-2026-04-09-21-41-09.jpg',
    desc: 'Certified square box truss, ground-support towers, motorized chain hoists, and engineering-approved structural safety for every stage build.',
    features: ['Certified Box Truss', 'Motorized Chain Hoists', 'Engineering-Approved Rigging'],
  },
  {
    badge: 'MICROPHONES',
    title: 'Wireless Mics & In-Ear Monitors',
    img: '/PHOTO-2026-05-17-11-37-22.jpg',
    desc: 'Reliable RF wireless microphone kits with directional antenna paddles, frequency coordination, and clear stereo in-ear monitor systems.',
    features: ['RF Wireless Mic Kits', 'Frequency Coordination', 'Stereo IEM Systems'],
  },
];
