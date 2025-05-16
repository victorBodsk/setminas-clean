'use client'; // Mark as Client Component

import React from 'react';
import { useParams } from 'next/navigation';
import LoteamentoLogo from '@/components/ui/loteamento-logo';
import Link from 'next/link';
import ImageCarousel from '@/components/ui/image-carousel';
import { featureIconPaths, getIconKey } from '@/utils/featureIcons';

// Corrigido: Tipagem da caracteristica aceita string OU objeto
export type CaracteristicaItem = string | { text: string; icon: string };

// Corrigido: Tipagem de loteamentosData
const loteamentosData: Record<string, {
  nome: string;
  cidade: string;
  descricaoHeader: string;
  conceito: string;
  caracteristicas: CaracteristicaItem[];
  galeria: string[];
  mapSrc?: string;
}> = {
  'parque-olimpico-3': {
    nome: 'Parque Olímpico 3',
    cidade: 'Governador Valadares',
    descricaoHeader: 'Você na região que mais valoriza em Valadares com infraestrutura completa.',
    conceito: 'Invista no seu futuro com o Parque Olímpico 3, situado na região de maior valorização em Governador Valadares...',
    caracteristicas: [
      'Lotes a partir de 200m²',
      { text: 'Região de alta valorização', icon: 'alta-valorizacao.svg' },
      'Infraestrutura completa',
      'Área verde',
      'Financiamento próprio com a Setminas'
    ],
    galeria: [
      '/images/loteamentos/pq-olimpico-3_em-obras.png',
      '/images/carrossel/placeholder4.jpg',
      '/images/carrossel/placeholder5.jpg'
    ],
    mapSrc: 'https://www.google.com/maps?q=-18.8801111,-41.9837778&z=15&output=embed'
  }
};

// Função para obter o ícone de uma característica
const getIconComponentForItem = (item: CaracteristicaItem): React.ReactNode => {
  let iconPath: string;
  let itemText: string;

  if (typeof item === 'string') {
    const iconKey = getIconKey(item);
    iconPath = featureIconPaths[iconKey] || featureIconPaths['default'];
    itemText = item;
  } else {
    iconPath = `/icons/features/${item.icon}`;
    itemText = item.text;
  }

  return (
    <img
      src={iconPath}
      alt={`${itemText} icon`}
      width={24}
      height={24}
      className="mr-2 flex-shrink-0"
    />
  );
};

export default function LoteamentoPage() {
  const params = useParams();
  const loteamentoId = params.loteamentoId as string;
  const loteamento = loteamentosData[loteamentoId];

  if (!loteamento) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Empreendimento não encontrado</h1>
        <p className="mb-8">O empreendimento que você está procurando não existe ou foi removido.</p>
        <Link href="/empreendimentos" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
          Ver todos os empreendimentos
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="p-8 text-center">
            <div className="relative w-[250px] h-[125px] mx-auto mb-6">
              <LoteamentoLogo nome={loteamento.nome} loteamentoId={loteamentoId} />
            </div>
            <h1 className="text-4xl font-bold text-[#0F3B7D] mb-2">{loteamento.nome}</h1>
            <div className="text-xl text-gray-600 mb-6">{loteamento.cidade}</div>
            <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-lg">
              {loteamento.descricaoHeader}
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-[#0F3B7D] text-white px-8 py-3 rounded-md hover:bg-[#0D336B] transition-colors">
                Solicitar Informações
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#0F3B7D] mb-6">Conceito do Empreendimento</h2>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{loteamento.conceito}</p>
          <h3 className="text-xl font-semibold text-[#0F3B7D] mb-4">Características</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-[#0F3B7D]">
            {loteamento.caracteristicas.map((item, index) => (
              <li key={index} className="flex items-center text-gray-700">
                {getIconComponentForItem(item)}
                <span className="ml-3 text-gray-700">{typeof item === 'string' ? item : item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-[#0F3B7D] mb-6 text-center">Galeria de Imagens</h2>
            <ImageCarousel images={loteamento.galeria} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#0F3B7D] mb-6 text-center">Localização</h2>
          <div className="aspect-w-16 aspect-h-9 mt-6">
            <iframe
              src={loteamento.mapSrc || 'https://www.google.com/maps?q=-20.9164856,-45.2796267&z=15&output=embed'}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de Localização - ${loteamento.nome}`}
            ></iframe>
          </div>
        </div>

        <div className="bg-[#0F3B7D] text-white rounded-lg shadow-lg p-12 text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Interessado no {loteamento.nome}?</h2>
          <p className="text-lg mb-8">Entre em contato conosco para saber mais detalhes e agendar uma visita.</p>
          <Link href="/contato" className="bg-white text-[#0F3B7D] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
            Fale Conosco
          </Link>
        </div>
      </div>
    </main>
  );
}
