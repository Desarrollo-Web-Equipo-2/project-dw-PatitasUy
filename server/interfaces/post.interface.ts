export interface Post {
    // TODO: add user owner of the post.
    id: number;
    title: string;
    url: string | String[];
    description: string;
    age: number;
    gender: string;
    type: string;
    size: string;
    location: string;
    state: 'Activo' | 'Finalizado';
}
