export default interface Profile {
	id: string;
	name: string;
	biography: string;
	charges: string[];
	imageIndex: number;
	images: string[];

	disabled: boolean;

	likes: number;
	dislikes: number;
}
