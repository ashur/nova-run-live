let tmp = nova.path.join( nova.extension.path, "tmp" );

nova.fs.mkdir( tmp );

exports.activate = () =>
{
	if( nova.fs.listdir( tmp ).length > 0)
	{		
		nova.fs.rmdir( tmp );
	}
};

nova.commands.register( "cab.ashur.runlive.run-editor", textEditor =>
{
	let range = new Range( 0, textEditor.document.length )
	let contents = textEditor.document.getTextInRange( range );

	runText( contents );
});

nova.commands.register( "cab.ashur.runlive.run-selection", textEditor =>
{
	runText( textEditor.selectedText );
});

function runText( text )
{
	if( text )
	{
		let basename = `${Date.now()}.js`;

		let path = nova.path.join( tmp, basename );

		let file = nova.fs.open( path, "w" );
		file.write( text );

		try
		{
			require( `../tmp/${basename}` );
		}
		catch( error )
		{
			console.log( error )
		}
		finally
		{
			nova.fs.remove( path );
		}
	}
}
