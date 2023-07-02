export interface Post {
    // TODO: add user owner of the post.
    id: number;
    title: string;
    url: string[];
    description: string;
    age: number;
    sex: string;
    type: string;
    size: string;
    location: string;
    state: 'Activo' | 'Finalizado';
}
