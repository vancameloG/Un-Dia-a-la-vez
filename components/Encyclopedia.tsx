
import React, { useState } from 'react';
import { Article, ArticleCategory } from '../types';

interface EncyclopediaProps {
    articles: Article[];
}

const ArticleCard: React.FC<{
    article: Article;
    isExpanded: boolean;
    onToggle: () => void;
}> = ({ article, isExpanded, onToggle }) => {

    const renderStyledText = (text: string) => {
        // Divide el texto por los marcadores de negrita (**), manteniendo los marcadores en el resultado para su identificación.
        const parts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.substring(2, part.length - 2)}</strong>;
            }
            return <React.Fragment key={index}>{part}</React.Fragment>;
        });
    };

    return (
        <div
            onClick={onToggle}
            className="bg-white rounded-xl shadow-md cursor-pointer transition-all duration-300 ease-in-out overflow-hidden hover:shadow-lg"
        >
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg">{article.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{article.summary}</p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <div
                className={`transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <img src={article.imageUrl} alt={article.title} className="w-full h-40 object-cover" />
                <div className="p-4 pt-2 text-slate-700">
                    {article.content.split('\n\n').map((paragraph, index) => {
                        // Título
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                            return (
                                <h4 key={index} className="font-bold text-slate-800 mt-4 mb-2">
                                    {paragraph.substring(2, paragraph.length - 2)}
                                </h4>
                            );
                        }
                        
                        // Lista
                        const isList = paragraph.startsWith('- ') || /^\d+\.\s/.test(paragraph);
                        if (isList) {
                            const isNumbered = /^\d+\.\s/.test(paragraph);
                            const ListTag = isNumbered ? 'ol' : 'ul';
                            const listStyle = isNumbered ? 'list-decimal' : 'list-disc';
                            
                            return (
                                <ListTag key={index} className={`${listStyle} pl-5 space-y-2 my-2`}>
                                    {paragraph.split('\n').map((item, i) => (
                                        <li key={i}>
                                            {renderStyledText(item.replace(/-\s|^\d+\.\s/, ''))}
                                        </li>
                                    ))}
                                </ListTag>
                            );
                        }

                        // Párrafo regular
                        return (
                            <p key={index} className="my-2">
                                {renderStyledText(paragraph)}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};


const Encyclopedia: React.FC<EncyclopediaProps> = ({ articles }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedArticles = filteredArticles.reduce((acc, article) => {
        (acc[article.category] = acc[article.category] || []).push(article);
        return acc;
    }, {} as Record<ArticleCategory, Article[]>);

    const handleToggleArticle = (articleId: string) => {
        setExpandedArticleId(prevId => (prevId === articleId ? null : articleId));
    };

    return (
        <div className="p-4">
            <header className="text-center my-4">
                <h1 className="text-3xl font-bold text-blue-700">Enciclopedia Rápida</h1>
                <p className="text-md text-blue-600 mt-1">Información confiable a tu alcance.</p>
            </header>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Busca temas como 'ojo seco', 'comer'..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </div>

            <div className="space-y-8">
                {Object.entries(groupedArticles).map(([category, articlesInCategory]) => (
                    <section key={category}>
                        <h2 className="text-xl font-bold text-blue-600 mb-3">{category}</h2>
                        <div className="space-y-3">
                            {articlesInCategory.map(article => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                    isExpanded={expandedArticleId === article.id}
                                    onToggle={() => handleToggleArticle(article.id)}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default Encyclopedia;
