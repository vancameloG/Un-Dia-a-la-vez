
import { Exercise, ExerciseCategory, Article, ArticleCategory, ZenActivity, ZenMode } from './types';

export const USER_NAME = "Alex";

export const DAILY_TIPS: string[] = [
    "Recuerda proteger tu ojo con gotas lubricantes si no parpadeas completamente.",
    "Masajea suavemente los músculos de tu cara en círculos para mejorar la circulación.",
    "Habla despacio y articula bien para ejercitar los músculos de la boca.",
    "Una dieta rica en vitaminas B12 y B6 puede ayudar a la recuperación nerviosa.",
    "El descanso es clave. Asegúrate de dormir lo suficiente para que tu cuerpo se recupere.",
    "Evita masticar chicle en exceso, puede causar fatiga muscular.",
    "Usa cinta adhesiva hipoalergénica o Cinta Neuromuscular para cerrar el ojo por la noche si es necesario."
];

export const EXERCISES: Exercise[] = [
    {
        id: 'e1',
        name: 'Elevación de Cejas',
        category: ExerciseCategory.Frente,
        description: 'Activa los músculos de la frente.',
        instructions: ['Siéntate derecho y relaja tu cara.', 'Coloca tus dedos índice sobre tus cejas.', 'Intenta levantar las cejas mientras aplicas una ligera resistencia con los dedos.', 'Sostén por 5 segundos y relaja.'],
        duration: 5,
        reps: 10,
        imageUrl: 'https://picsum.photos/seed/e1/400/300'
    },
    {
        id: 'e2',
        name: 'Cierre Suave de Ojos',
        category: ExerciseCategory.Ojos,
        description: 'Mejora el control del párpado.',
        instructions: ['Cierra los ojos suavemente, sin apretar.', 'Concéntrate en sentir el músculo del párpado.', 'Mantén los ojos cerrados por 10 segundos.', 'Ábrelos lentamente.'],
        duration: 10,
        reps: 8,
        imageUrl: 'https://picsum.photos/seed/e2/400/300'
    },
    {
        id: 'e3',
        name: 'Sonrisa Simétrica',
        category: ExerciseCategory.Boca,
        description: 'Fomenta una sonrisa más equilibrada.',
        instructions: ['Párate frente a un espejo.', 'Intenta sonreír lentamente, mostrando solo un poco los dientes.', 'Usa tus dedos para ayudar a levantar la comisura del lado afectado si es necesario.', 'Mantén la sonrisa por 5 segundos.'],
        duration: 5,
        reps: 12,
        imageUrl: 'https://picsum.photos/seed/e3/400/300'
    },
    {
        id: 'e4',
        name: 'Inflar Mejillas',
        category: ExerciseCategory.Mejillas,
        description: 'Fortalece los músculos buccinadores.',
        instructions: ['Toma una bocanada de aire.', 'Infla tus mejillas, manteniendo los labios sellados.', 'Pasa el aire de una mejilla a la otra.', 'Sostén el aire por 10 segundos y luego suéltalo.'],
        duration: 10,
        reps: 5,
        imageUrl: 'https://picsum.photos/seed/e4/400/300'
    },
    {
        id: 'e5',
        name: 'Masaje Circular',
        category: ExerciseCategory.Masajes,
        description: 'Relaja la tensión y estimula el flujo sanguíneo.',
        instructions: ['Usa las yemas de tus dedos.', 'Realiza pequeños masajes circulares en las mejillas, frente y alrededor de la boca.', 'Aplica una presión suave pero firme.', 'Continúa por 2 minutos.'],
        duration: 120,
        reps: 1,
        imageUrl: 'https://picsum.photos/seed/e5/400/300'
    }
];

export const ARTICLES: Article[] = [
    {
        id: 'a1',
        title: '¿Qué es la Parálisis de Bell?',
        category: ArticleCategory.PrimerosPasos,
        summary: 'Entiende las causas, síntomas y el pronóstico general de esta condición.',
        content: 'La parálisis de Bell es una debilidad o parálisis súbita y temporal de los músculos de un lado de la cara. Ocurre cuando el nervio facial (el séptimo par craneal), que controla esos músculos, se inflama, se hincha o se comprime.\n\nAunque la causa exacta no está clara, a menudo se cree que está relacionada con una infección viral. Los síntomas aparecen de repente y pueden incluir una caída de la comisura de la boca, dificultad para cerrar un ojo, babeo y alteración del gusto. Es crucial consultar a un médico para descartar otras condiciones más serias. La buena noticia es que la mayoría de las personas con parálisis de Bell se recuperan por completo en unos pocos meses, especialmente con el tratamiento y los cuidados adecuados.',
        imageUrl: 'https://picsum.photos/seed/a1-doc/400/200'
    },
    {
        id: 'a2',
        title: 'El Cuidado del Ojo es Prioridad',
        category: ArticleCategory.CuidadosDiarios,
        summary: 'Aprende por qué y cómo proteger tu ojo cuando el parpadeo está afectado.',
        content: 'Cuando no puedes parpadear completamente, tu ojo queda expuesto y vulnerable a la sequedad, lo que puede causar dolor, infecciones e incluso daño permanente en la córnea. Protegerlo es tu tarea más importante.\n\n**Pasos Clave:**\n\n1. **Gotas Lubricantes:** Usa lágrimas artificiales durante el día, cada 1-2 horas, para mantener el ojo húmedo.\n2. **Ungüento por la Noche:** Antes de dormir, aplica un ungüento lubricante (es más espeso) para una protección duradera.\n3. **Cierre Manual:** Cierra suavemente el párpado con la yema del dedo varias veces al día para distribuir la lágrima.\n4. **Cinta Hipoalergénica:** Por la noche, utiliza una cinta adhesiva especial para mantener el ojo cerrado mientras duermes.\n5. **Gafas de Sol:** Usa gafas de sol envolventes al salir para proteger el ojo del viento, el polvo y la luz solar.',
        imageUrl: 'https://picsum.photos/seed/a2-art/400/200'
    },
    {
        id: 'a3',
        title: 'Fisioterapia: Tu Gran Aliada',
        category: ArticleCategory.Tratamientos,
        summary: 'Descubre cómo la fisioterapia acelera y mejora la calidad de la recuperación.',
        content: 'La fisioterapia es fundamental para reeducar a tus músculos faciales a moverse correctamente otra vez. Un terapeuta especializado te guiará para:\n\n- **Activar Músculos:** Realizar ejercicios suaves y específicos frente a un espejo para estimular el nervio y los músculos debilitados.\n- **Relajar Tensión:** Aplicar masajes para relajar las zonas que puedan estar tensas o contracturadas.\n- **Evitar Sincinesias:** Prevenir movimientos involuntarios (por ejemplo, que el ojo se cierre al sonreír). Esto se logra con ejercicios muy controlados y de baja intensidad.\n- **Mejorar Coordinación:** Recuperar la capacidad de realizar expresiones faciales naturales y simétricas.\n\nLa constancia es clave. Sigue las indicaciones de tu terapeuta, sé paciente y no fuerces los movimientos.',
        imageUrl: 'https://picsum.photos/seed/a3-art/400/200'
    },
    {
        id: 'a4',
        title: '¿Puedo comer normalmente?',
        category: ArticleCategory.PreguntasFrecuentes,
        summary: 'Consejos prácticos para la hora de comer y beber.',
        content: 'Comer puede ser un desafío al principio. La debilidad en los labios y la mejilla puede hacer que la comida o la bebida se escapen. ¡No te preocupes, hay solución!\n\n**Consejos Útiles:**\n\n- **Pequeños Bocados:** Corta la comida en trozos más pequeños de lo habitual.\n- **Lado Fuerte:** Mastica del lado no afectado de la cara.\n- **Alimentos Blandos:** Opta por alimentos más blandos y fáciles de masticar si lo necesitas.\n- **Beber con Pajita:** Usa una pajita (popote/sorbete) para controlar mejor los líquidos y evitar derrames.\n- **Higiene Extrema:** Después de comer, asegúrate de limpiar bien el interior de la mejilla afectada, ya que pueden quedar restos de comida sin que te des cuenta. Un enjuague bucal puede ser de gran ayuda.',
        imageUrl: 'https://picsum.photos/seed/a4-art/400/200'
    },
    {
        id: 'i1',
        title: 'Globos',
        category: ArticleCategory.Implementos,
        summary: 'Fortalece los músculos de las mejillas y mejora el sellado de los labios.',
        content: 'Inflar globos es un excelente ejercicio para el músculo buccinador, clave para mantener la comida en la boca al masticar y para soplar.\n\n**Cómo Usarlos:**\n\n- **Empieza Fácil:** Comienza con globos que no sean muy duros de inflar.\n- **Toma Aire:** Respira profundamente por la nariz.\n- **Sella y Sopla:** Cierra bien los labios alrededor del globo y sopla de manera constante y controlada, intentando inflar la mejilla del lado afectado.\n- **Controla:** Intenta que el aire no se escape por la comisura de los labios. Puedes ayudarte sujetando la comisura con los dedos al principio.\n- **Pocas Repeticiones:** Realiza 3-5 inflados para no fatigar en exceso el músculo. La calidad es más importante que la cantidad.',
        imageUrl: 'https://picsum.photos/seed/i1-art/400/200'
    },
    {
        id: 'i2',
        title: 'Cinta Neuromuscular (Kinesiotape)',
        category: ArticleCategory.Implementos,
        summary: 'Proporciona soporte a los músculos debilitados y puede reducir la tensión.',
        content: 'La cinta neuromuscular, aplicada correctamente por un fisioterapeuta, puede ayudar a dar un estímulo sensorial y un ligero soporte a los músculos faciales, recordándoles la dirección correcta del movimiento.\n\n**Importante:**\n\n- **Busca un Profesional:** Su aplicación en la cara es delicada. Pide a tu fisioterapeuta que te enseñe a colocarla correctamente para tu caso específico.\n- **Objetivos:** Se puede usar para elevar la comisura de la boca, ayudar al cierre del ojo o relajar músculos que están demasiado tensos.\n- **Piel Limpia:** Aplica siempre sobre la piel limpia, seca y sin cremas.\n- **No Estirar Demasiado:** A diferencia de otras aplicaciones, en la cara se suele usar con muy poca o ninguna tensión.',
        imageUrl: 'https://picsum.photos/seed/i2-art/400/200'
    },
    {
        id: 'i3',
        title: 'Chicle sin Azúcar',
        category: ArticleCategory.Implementos,
        summary: 'Ayuda a practicar la masticación bilateral y a coordinar los músculos.',
        content: 'Masticar chicle puede ser un ejercicio útil, pero debe hacerse con moderación para evitar la fatiga o el fortalecimiento de movimientos incorrectos (sincinesias).\n\n**Recomendaciones:**\n\n- **Sin Azúcar:** Elige siempre chicle sin azúcar para proteger tu salud dental.\n- **Mastica Lento:** Concéntrate en el movimiento. Intenta masticar de forma bilateral, es decir, pasando el chicle de un lado a otro.\n- **Lado Afectado:** Practica con cuidado masticar en el lado afectado, sintiendo cómo trabajan los músculos.\n- **Periodos Cortos:** Mastica solo durante 2-5 minutos para evitar el agotamiento muscular. Es un ejercicio, no un hábito.',
        imageUrl: 'https://picsum.photos/seed/i3-art/400/200'
    },
    {
        id: 'i4',
        title: 'Pajitas / Popotes',
        category: ArticleCategory.Implementos,
        summary: 'Mejora la fuerza de los labios y la capacidad de succión.',
        content: 'Usar una pajita es una forma sencilla y eficaz de trabajar los músculos orbiculares de los labios, responsables de fruncirlos, besar y sellarlos para beber.\n\n**Ejercicios Simples:**\n\n- **Beber Líquidos:** Empieza bebiendo líquidos de consistencia normal, como agua. Concéntrate en sellar bien los labios alrededor de la pajita para que no se escape aire ni líquido.\n- **Líquidos Espesos:** A medida que ganes fuerza, prueba con líquidos más espesos, como un batido o un yogur bebible. Esto requerirá un mayor esfuerzo de succión.\n- **Sujetar la Pajita:** Intenta sujetar la pajita horizontalmente usando solo la fuerza de tus labios, sin ayuda de los dientes.',
        imageUrl: 'https://picsum.photos/seed/i4-art/400/200'
    },
    {
        id: 'i5',
        title: 'Parche Ocular',
        category: ArticleCategory.Implementos,
        summary: 'Protege el ojo de la sequedad y de partículas externas durante el día.',
        content: 'El parche ocular es un complemento a las gotas lubricantes, especialmente útil si pasas tiempo al aire libre o en ambientes con mucho polvo o viento.\n\n**Cuándo y Cómo Usarlo:**\n\n- **Protección Extra:** Úsalo cuando las gotas no sean suficientes o necesites una barrera física. Ideal para siestas durante el día.\n- **Cámara Húmeda:** Algunos parches tienen forma de burbuja para crear una "cámara húmeda", que mantiene la humedad alrededor del ojo sin tocarlo directamente. Son muy recomendables.\n- **No Sustituye la Lubricación:** Recuerda que el parche protege, pero no hidrata. Sigue usando tus lágrimas artificiales según lo prescrito por tu médico, incluso si llevas el parche.',
        imageUrl: 'https://picsum.photos/seed/i5-art/400/200'
    }
];

export const ZEN_ACTIVITIES: ZenActivity[] = [
    { id: 'z1', type: ZenMode.Breathing, title: 'Respiración Profunda', duration: 3, description: 'Calma tu sistema nervioso con ciclos de respiración lenta y controlada.' },
    { id: 'z2', type: ZenMode.Breathing, title: 'Respiración de Caja (4-4-4-4)', duration: 5, description: 'Inhala, sostén, exhala y sostén por 4 segundos cada fase para un enfoque total.' },
    { id: 'z3', type: ZenMode.Meditation, title: 'Aceptación y Paciencia', duration: 5, description: 'Un audio guiado para cultivar la aceptación en tu proceso de recuperación.' },
    { id: 'z4', type: ZenMode.Meditation, title: 'Escaneo Corporal Facial', duration: 7, description: 'Conecta con cada músculo de tu rostro, sin juicios y con amabilidad.' },
];