let tmp = nova.path.join( nova.extension.path, "tmp" );

exports.activate = () =>
{
	nova.fs.mkdir( tmp );
};

nova.commands.register( "ashur.RunLive.run", textEditor =>
{
	let ranges = textEditor.selectedRanges;
	let selections = ranges.map( range =>
	{
		return textEditor.document.getTextInRange( range ).trim();
	});

	let contents = selections.join( "\n" );

	/* Zero-length selection */
	if( ranges.length === 1 && contents.length === 0 )
	{
		let documentRange = new Range( 0, textEditor.document.length );
		contents = textEditor.document.getTextInRange( documentRange );
	}

	runText( contents );
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
